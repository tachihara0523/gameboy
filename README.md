# gameboy

## Prerequisites

- Docker
- Visual Studio Code
- Remote - Containers 拡張機能

## Setup

1. **Visual Studio Code を開く**

   Visual Studio Code を起動し、プロジェクトのフォルダを開きます。

2. **Reopen Project Folder in devcontainer**

   プロジェクトフォルダを開いた状態で、コマンドパレット（`F1` または `Ctrl+Shift+P`）を開き、次のコマンドを入力します。

   ```
   Remote-Containers: Reopen in Container
   ```   

4. **Build and Start the Container**

   コマンドを実行すると、devcontainer の設定に基づいて Docker コンテナがビルドされ、開発環境が自動的にセットアップされます。このプロセスには数分かかる場合があります。

5. **Start Server**

   ```
   cd app
   npm run dev
   ```

   http://localhost:5173/
