import { useState, useRef, useEffect } from "react";
import flex from "@course/styles";
import { StarRatingComponent } from "./star-rating.react";
import { StarRating } from "./star-rating";

export const StarRatingExample = () => {
    const [rating, setRating] = useState(0);

    return (
        <div className={flex.flexColumnGap24}>
            <div className={flex.flexColumnGap8}>
                <h3>Interactive Rating</h3>
                <StarRatingComponent value={rating} onChange={setRating} />
                <p>Current Value: {rating}</p>
            </div>

            <div className={flex.flexColumnGap8}>
                <h3>Readonly (3 Stars)</h3>
                <StarRatingComponent readonly value={3} onChange={() => { }} />
            </div>

            <div className={flex.flexColumnGap8}>
                <h3>Readonly (5 Stars)</h3>
                <StarRatingComponent readonly value={5} onChange={() => { }} />
            </div>
        </div>
    );
};

export const StarRatingVanillaExample = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ratingRef = useRef<StarRating | null>(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        ratingRef.current = new StarRating({
            root: containerRef.current,
            className: 'star-rating',
            value: rating,
            onValueChange: (newValue) => setRating(newValue),
        });
        ratingRef.current.render();

        return () => {
            ratingRef.current?.destroy();
            ratingRef.current = null;
        };
    }, [rating]);

    return (
        <div className={flex.flexColumnGap24}>
            <div className={flex.flexColumnGap8}>
                <h3>Vanilla JS - Interactive Rating</h3>
                <div ref={containerRef} />
                <p>Current Value: {rating}</p>
            </div>
        </div>
    );
};
