import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabaseClient';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}


interface TaskListProps {
  reload: boolean;
  onEdit: (task: Task) => void;
}

export const fetchTasks = async (setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });

    if (error) return;

    setTasks(data || []);
  } catch (err) {
    console.error(err);
  }
};

export const toggleTaskCompletion = async (
  id: number,
  currentState: boolean,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  try {
    const { error } = await supabase.from('tasks').update({ completed: !currentState }).eq('id', id);

    if (error) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !currentState } : task))
    );
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = async (id: number, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  try {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) return;

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  } catch (err) {
    console.error(err);
  }
};

const TaskList: React.FC<TaskListProps> = ({ reload, onEdit }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  useEffect(() => {
    if (reload) {
      fetchTasks(setTasks);
    }
  }, [reload]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>
            {item.title} - {item.completed ? '✅' : '❌'}
          </Text>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => toggleTaskCompletion(item.id, item.completed, setTasks)}
          >
            <Text style={styles.completeButtonText}>
              {item.completed ? 'Desmarcar' : 'Completar'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id, setTasks)}
          >
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default TaskList;
