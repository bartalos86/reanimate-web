"use server"
import { signOut as signOutAuth } from "@/auth";

export async function logout(){
  await signOutAuth();
}