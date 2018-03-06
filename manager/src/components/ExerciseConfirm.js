import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection, Button, Input } from './common';

// Code for a confirm modal after the user has selected an exercise
const ExerciseConfirm = ({ visible, onAccept, onDecline, thisBenchmark, onBenchmarkUpdate }) => {

  const { containerStyle, textStyle, cardSectionStyle, helpStyle } = styles;

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
              What will the benchmark be?
          </Text>
        </CardSection>

        <CardSection style={cardSectionStyle}>
          <Text style={helpStyle}>
              Motivate your client with a target to aim for each set
          </Text>
        </CardSection>

        <CardSection>
          <Input
            label="Benchmark"
            placeholder="Enter benchmark"
            value={thisBenchmark}
            onChangeText={onBenchmarkUpdate}
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
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 40
  },
  helpStyle: {
    fontSize: 16,
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

export { ExerciseConfirm };
