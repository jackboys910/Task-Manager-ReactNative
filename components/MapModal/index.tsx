import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { MAP } from './constants/map';
import { styles } from './index.styles';

interface IMapModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMessage: (event: WebViewMessageEvent) => void;
}

const MapModal: React.FC<IMapModalProps> = ({ isVisible, onClose, onMessage }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.mapContainer}>
        <WebView
          source={{
            html: MAP,
          }}
          style={styles.map}
          onMessage={onMessage}
        />
        <Button title="Закрыть карту" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default MapModal;
