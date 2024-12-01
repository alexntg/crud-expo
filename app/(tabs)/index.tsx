import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Alert } from 'react-native';
import TaskList from '@/components/crud/TaskList';
import TaskForm from '@/components/crud/TaskForm';
import { Task } from '@/components/crud/TaskList';
import { supabase } from '@/supabaseClient';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [reload, setReload] = useState(false); 

  const handleSaveTask = (task: Task) => {
    const saveTaskToDatabase = async () => {
      try {
        if (task.id) {
          const { error } = await supabase
            .from('tasks')
            .update({ title: task.title, description: task.description })
            .eq('id', task.id);

          if (error) throw error;

          Alert.alert('Tarea actualizada');
        } else {
          const { error } = await supabase
            .from('tasks')
            .insert([
              {
                title: task.title,
                description: task.description,
                completed: false,
              },
            ]);

          if (error) throw error;

          Alert.alert('Tarea creada');
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Hubo un error al guardar la tarea');
      }
    };

    saveTaskToDatabase();
    setReload(!reload);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowForm(true); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Nueva Tarea"
        onPress={() => {
          setCurrentTask(null); 
          setShowForm(true); 
        }}
      />
      {showForm ? (
        <TaskForm
          task={currentTask} 
          onSave={handleSaveTask}
          onCancel={handleCancel}
        />
      ) : (
        <TaskList reload={reload} onEdit={handleEditTask} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#222',
  },
});

export default App;
