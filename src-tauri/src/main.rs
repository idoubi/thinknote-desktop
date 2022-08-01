#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn log(msg: String) {
  println!("debug msg is : {}", msg)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![log])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
