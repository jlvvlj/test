import React from 'react';
import { useEffect } from 'react';

export const Banner = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    return () => {
      const mainBg = document.getElementById('main-bg');
      const gradient = document.getElementById('bg-gradient');
      if (mainBg && props.useBannerBg) {
        mainBg.style.backgroundImage = '';
        mainBg.style.display = 'none';
      }
      if (gradient) gradient.style.display = 'none';
    };
  }, [props.src, props.useBannerBg]);

  return (
    <>
      <div id="mobile-banner">
        <img className="banner-img" src={props.src} />
        <div className="banner-content">
          <div id={'main-heading'}>{props.headingText}</div>
          <div id={'sub-heading'}>{props.subHeadingText}</div>
          {props.actionComponent}
        </div>
      </div>
      <div id={'current-banner'} className="mt-40">
        <div id="banner-inner">
          <div className="flex justify-between items-start h-full w-full">
            <div
              id={'main-heading'}
              className="w-full border-l border-white pl-4 h-full"
            >
              <h1 className="text-2xl text-white w-1/3">
                {props.subHeadingText}
              </h1>
            </div>
            <div className="flex justify-start items-start flex-col w-full h-full border-l border-white pl-4">
              <h1 className="text-7xl text-white w-5/6 mb-2">
                {props.headingText}
              </h1>
              {props.actionComponent}
            </div>
          </div>
          {props.children}
          <div className="powered-by">
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};
