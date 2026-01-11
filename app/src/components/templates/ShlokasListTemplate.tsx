import {
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import { Divider } from '@rneui/themed';
import Images from '../../../utils/Images/Images';
import { styles } from '../../screens/ShlokasList/styles';
import { vs } from '../../../utils/helper/Metrics';

interface TemplateProps {
  header: React.ReactNode;
  controls: React.ReactNode;
  children: React.ReactNode;
}

const ShlokasListTemplate: React.FC<TemplateProps> = ({ header, controls, children }) => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={Images.BACKGROUND}
      resizeMode="cover">
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.mainView}>
          {header}
          {controls}
        </View>
        <Divider width={1} color="rgb(161,127,69)" style={{ margin: vs(8) }} />
        <View style={styles.container}>
            {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ShlokasListTemplate;
