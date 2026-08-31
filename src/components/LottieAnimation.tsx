import React from 'react';
import Lottie from 'react-lottie';

interface ILottieAnimationProps {
    animationData: any;
}

const LottieAnimation = ({ animationData }: ILottieAnimationProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return <Lottie options={defaultOptions} />;
};

export default LottieAnimation;
