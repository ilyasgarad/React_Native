import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setGoals((currentGoals) => [
      ...currentGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ]);
    // setModalIsVisible(false);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
    
  }

  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#5e0acc"onPress={startAddGoalHandler}/>
     <GoalInput visible={modalIsVisible} 
     onAddGoal={addGoalHandler}
     onCancel={endAddGoalHandler}/>
      <View style={styles.goalContainer}>
      <FlatList data={goals} renderItem={(itemData) => {
          return <GoalItem 
          text={itemData.item.text}
          id={itemData.item.id}
          onDeletedItem={deleteGoalHandler} />;
      }}
      keyExtractor={(item, index) => {
        return item.id;
      }}/>

      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
 
  goalContainer: {
    flex: 7,
  },
});
