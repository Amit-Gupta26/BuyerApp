import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  FlatList
} from "react-native";

class CustomModalPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.props.data,
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <TouchableHighlight
            style={styles.flatListContainer}
            onPress={() => this.setModalVisible(false)}>
            <View>
              <FlatList
                data={this.state.dataSource}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.backgroundColour}
                    onPress={() => {
                      this.setState({ modalVisible: false });
                      this.props.onItemSelected(item);
                    }}>
                    <Text style={styles.flatListRowItem}>{item.key}</Text>
                  </TouchableHighlight>
                )}
              />
            </View>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}
export default CustomModalPicker;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "transparent",
    flex: 1,
    position: "absolute"
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#333333cc",
    padding: 16
  },
  flatListRowItem: {
    backgroundColor: "#fff",
    padding: 16,
    fontSize: 18,
    color: "#222",
    borderColor: "#000000"
  },
  backgroundColour: {
    backgroundColor: 'white'
  }
});
