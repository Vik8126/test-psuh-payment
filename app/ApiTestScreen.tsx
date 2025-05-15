import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";

const API_URL = "http://192.168.29.161:3000/items";

export default function ApiTestScreen() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!newName) return;
    await axios.post(API_URL, { name: newName });
    setNewName("");
    fetchItems();
  };

  const updateItem = async () => {
    if (!updateName || !selectedId) return;
    await axios.put(`${API_URL}/${selectedId}`, { name: updateName });
    setUpdateName("");
    setSelectedId(null);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test Page</Text>

      <TextInput
        style={styles.input}
        placeholder="New item name"
        value={newName}
        onChangeText={setNewName}
      />
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name}</Text>
            <Button
              title="Edit"
              onPress={() => {
                setSelectedId(item.id);
                setUpdateName(item.name);
              }}
            />
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />

      {selectedId && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Updated name"
            value={updateName}
            onChangeText={setUpdateName}
          />
          <Button title="Update Item" onPress={updateItem} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
