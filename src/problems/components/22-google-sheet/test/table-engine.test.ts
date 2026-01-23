import { describe, it, expect } from 'bun:test'
import { tokenize, toRpn, isCellReference, type Token } from '../utility'
import { TableEngine } from '../table-engine'

describe('Google Sheet Engine', () => {
  describe('utility', () => {
    describe('isCellReference', () => {
      it('should return true for valid cell references', () => {
        expect(isCellReference('A1')).toBe(true)
        expect(isCellReference('Z99')).toBe(true)
        expect(isCellReference('B10')).toBe(true)
      })

      it('should return false for invalid cell references', () => {
        expect(isCellReference('1A')).toBe(false)
        expect(isCellReference('A')).toBe(false)
        expect(isCellReference('1')).toBe(false)
        expect(isCellReference('small')).toBe(false)
        expect(isCellReference('AA1')).toBe(false) // Current impl only supports single letter
      })
    })

    describe('tokenize', () => {
      it('should tokenize simple numbers', () => {
        expect(tokenize('123')).toEqual({ ok: true, tokens: [{ t: 'num', v: 123 }] })
        expect(tokenize('12.34')).toEqual({ ok: true, tokens: [{ t: 'num', v: 12.34 }] })
      })

      it('should tokenize binary operators', () => {
        expect(tokenize('1 + 2 - 3 * 4 / 5')).toEqual({
          ok: true,
          tokens: [
            { t: 'num', v: 1 },
            { t: 'op', op: '+' },
            { t: 'num', v: 2 },
            { t: 'op', op: '-' },
            { t: 'num', v: 3 },
            { t: 'op', op: '*' },
            { t: 'num', v: 4 },
            { t: 'op', op: '/' },
            { t: 'num', v: 5 },
          ],
        })
      })

      it('should tokenize parentheses', () => {
        expect(tokenize('( )')).toEqual({
          ok: true,
          tokens: [{ t: 'lp' }, { t: 'rp' }],
        })
      })

      it('should tokenize cell references', () => {
        expect(tokenize('A1 B2')).toEqual({
          ok: true,
          tokens: [
            { t: 'ref', id: 'A1' },
            { t: 'ref', id: 'B2' },
          ],
        })
      })

      it('should handle unary minus', () => {
        // Start
        expect(tokenize('-1')).toEqual({
          ok: true,
          tokens: [
            { t: 'op', op: 'NEG' },
            { t: 'num', v: 1 },
          ],
        })
        // After op
        expect(tokenize('1+-1')).toEqual({
          ok: true,
          tokens: [
            { t: 'num', v: 1 },
            { t: 'op', op: '+' },
            { t: 'op', op: 'NEG' },
            { t: 'num', v: 1 },
          ],
        })
        // After paren
        expect(tokenize('(-1)')).toEqual({
          ok: true,
          tokens: [{ t: 'lp' }, { t: 'op', op: 'NEG' }, { t: 'num', v: 1 }, { t: 'rp' }],
        })
      })
    })

    describe('toRpn', () => {
      it('should convert infix to RPN correctly', () => {
        // 1 + 2
        const t1 = tokenize('1 + 2') as { ok: true; tokens: Token[] }
        const r1 = toRpn(t1.tokens)
        // 1 2 +
        expect((r1 as any).rpn).toEqual([
          { t: 'num', v: 1 },
          { t: 'num', v: 2 },
          { t: 'op', op: '+' },
        ])
      })

      it('should assume correct precedence', () => {
        // 1 + 2 * 3 -> 1 2 3 * +
        const t = tokenize('1 + 2 * 3') as { ok: true; tokens: Token[] }
        const r = toRpn(t.tokens)
        const ops = (r as any).rpn.map((x: any) => x.v ?? x.op)
        expect(ops).toEqual([1, 2, 3, '*', '+'])
      })

      it('should handle parentheses', () => {
        // (1 + 2) * 3 -> 1 2 + 3 *
        const t = tokenize('(1 + 2) * 3') as { ok: true; tokens: Token[] }
        const r = toRpn(t.tokens)
        const ops = (r as any).rpn.map((x: any) => x.v ?? x.op)
        expect(ops).toEqual([1, 2, '+', 3, '*'])
      })
    })
  })

  describe('TableEngine', () => {
    it('should set and get raw values', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', 'hello')
      expect(engine.getRaw('A1')).toBe('hello')
      expect(engine.getValue('A1')).toBe('hello')
    })

    it('should evaluate simple formulas', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '=1+1')
      expect(engine.getValue('A1')).toBe('2')
    })

    it('should evaluate formulas with references', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '10')
      engine.setRaw('B1', '=A1 * 2')
      expect(engine.getValue('B1')).toBe('20')
    })

    it('should update dependencies', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '10')
      engine.setRaw('B1', '=A1 * 2')
      expect(engine.getValue('B1')).toBe('20')

      engine.setRaw('A1', '5')
      expect(engine.getValue('A1')).toBe('5')
      expect(engine.getValue('B1')).toBe('10')
    })

    it('should handle complex formulas', () => {
      const engine = new TableEngine()
      // (10 + 5) * 2 / 5 - 1 = 15 * 2 / 5 - 1 = 30 / 5 - 1 = 6 - 1 = 5
      engine.setRaw('A1', '=(10 + 5) * 2 / 5 - 1')
      expect(engine.getValue('A1')).toBe('5')
    })

    it('should handle multi-cell complex formulas', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '10')
      engine.setRaw('A2', '5')
      engine.setRaw('A3', '2')
      // = A1 + A2 * A3 = 10 + 5 * 2 = 20
      engine.setRaw('B1', '=A1 + A2 * A3')
      expect(engine.getValue('B1')).toBe('20')

      // = (A1 + A2) * A3 = 15 * 2 = 30
      engine.setRaw('B2', '=(A1 + A2) * A3')
      expect(engine.getValue('B2')).toBe('30')
    })

    it('should handle division by zero', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '=1/0')
      expect(engine.getValue('A1')).toBe('#DIV/0!')
    })

    it('should detect cycles', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '=B1')
      engine.setRaw('B1', '=A1')
      expect(engine.getValue('A1')).toBe('#CYCLE!')
      expect(engine.getValue('B1')).toBe('#CYCLE!')
    })

    it('should recover from cycles', () => {
      const engine = new TableEngine()
      engine.setRaw('A1', '=B1')
      engine.setRaw('B1', '=A1')
      expect(engine.getValue('A1')).toBe('#CYCLE!')

      engine.setRaw('B1', '5')
      expect(engine.getValue('B1')).toBe('5')
      expect(engine.getValue('A1')).toBe('5')
    })
  })
})
