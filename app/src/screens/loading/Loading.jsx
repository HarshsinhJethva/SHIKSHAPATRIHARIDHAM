import React from 'react';
import FullScreenImageTemplate from '@components/templates/FullScreenImageTemplate';
import useLoading from './useLoading';

const Loading = ({ navigation }) => {
  const { imageSource } = useLoading({ navigation });

  return <FullScreenImageTemplate imageSource={imageSource} />;
};

export default Loading;
