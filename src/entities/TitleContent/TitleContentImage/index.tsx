import React, { FC } from 'react';

interface ITitleContentImage {
  image_url: string;
  title: string;
}

const TitleContentImage: FC<ITitleContentImage> = ({ image_url, title }) => {
  return <img src={image_url} alt={title} />;
};

export default TitleContentImage;
