import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CatalogScreen from "../screens/CatalogScreen"
import ProductDetailsScreen from "../screens/ProductDetailsScreen"

const Stack = createNativeStackNavigator()

export default function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatalogMain"
        component={CatalogScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: "О товаре" }}
      />
    </Stack.Navigator>
  )
}
