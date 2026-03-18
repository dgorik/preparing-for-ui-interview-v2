import {useState} from 'react'
import flex from 'src/utils/styles.module.css'
import cx from 'src/utils/utility'
import {useFileUpload} from '../../49-use-file-upload/solution/use-upload'
import {ProgressBar} from '../../46-progress-bar/solution/progress-bar.react'

/**
 * Expected behavior:
 * - "Select File" button triggers hidden file input
 * - On file select, upload starts automatically via useFileUpload hook
 * - Shows file name, speed, remaining time, progress bar
 * - Pause/Resume/Cancel buttons based on upload status
 * - "Upload Another" button after completion
 */

export const UploadComponent = () => {
    // Step 1: Hook & State — useFileUpload() for [uploadState, uploadControls] + useState<File|null> + fileInputRef
    const [state, controls] = useFileUpload()
    const [file, setFile] = useState<File | null>(null)

    // Step 2: Handlers:
    //   - handleFileChange: get file from input, setFile
    //   - Start/Pause/Resume/Cancel triggered directly via controls in JSX
    function handleFileChange({target}: React.ChangeEvent) {
        if (target instanceof HTMLInputElement) {
            const file = target?.files?.[0]
            if (file) {
                setFile(file)
            }
        }
    }

    // Step 3: Render:
    //   - <input type="file"> for file selection
    //   - If not idle: show ProgressBar, speed, remaining time, uploaded bytes
    //   - Buttons: Upload (idle), Pause (uploading), Resume (paused), Cancel/Reset (not idle)
    return (
        <section className={cx(flex.flexColumnGap16, flex.padding16, flex.b1, flex.w400px)}>
            <h2>Upload file to the server</h2>
            <input onChange={handleFileChange} type="file"/>
            {state.status !== 'idle' ? (
                <div>
                    <ProgressBar value={state.progress}/>
                    <section className={flex.flexColumnGap8}>
                        <p>
                            <strong>Speed: </strong>
                            {Math.round(state.speed)}KB/s
                        </p>
                        <p>
                            <strong>Remaining time: </strong>
                            {Math.round((state.remainingTimeMs ?? 0) / 1000)} seconds
                        </p>
                        <p>
                            <strong>Uploaded: </strong>
                            {Math.round((state.bytes ?? 0) / 1024)} KBs
                        </p>
                    </section>
                </div>
            ) : null}
            <ul className={cx(flex.flexRowGap8)}>
                <button
                    onClick={() => controls.start(file!)}
                    disabled={state.status !== 'idle' || file == null}
                >
                    Upload
                </button>
                <button onClick={() => controls.pause()} disabled={state.status !== 'uploading'}>
                    Pause
                </button>
                <button onClick={() => controls.resume(file!)} disabled={state.status !== 'paused'}>
                    Resume
                </button>
                <button onClick={() => controls.cancel()} disabled={state.status === 'idle'}>
                    Cancel / Reset
                </button>
            </ul>
        </section>
    )
}
