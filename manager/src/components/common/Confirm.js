import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Input } from './Input';

const Confirm = ({ children, visible, onAccept, onDecline, thisBenchmark, onBenchmarkUpdate }) => {

  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection>
          <Input
            label="Benchmark"
            placeholder="Enter benchmark"
            value={thisBenchmark}
            onChangeText={onBenchmarkUpdate}
            //onChangeText={value => this.props.benchmarkUpdate({ prop: 'benchmark', value })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={onDecline}>Cancel</Button>
          <Button onPress={onAccept}>Confirm</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };
