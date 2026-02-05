## Firebase Storage CORS Configuration

To allow image uploads from your deployed site, you must configure CORS for your Firebase Storage bucket.

### Option 1: Using Google Cloud Shell (Recommended - No Installation)
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click the **Activate Cloud Shell** icon (terminal icon in the top right toolbar).
3.  In the Cloud Shell terminal, create the cors configuration file:
    ```bash
    nano cors.json
    ```
4.  Paste the following content into the editor:
    ```json
    [
      {
        "origin": ["https://infrioinfotech.qzz.io", "http://localhost:5173", "http://localhost:5000"],
        "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
        "maxAgeSeconds": 3600
      }
    ]
    ```
5.  Save and exit (Press `Ctrl+O`, `Enter`, then `Ctrl+X`).
6.  Run the command to set CORS (replace `your-bucket-name` with your actual bucket name, e.g., `infrio-infotech.appspot.com`):
    ```bash
    gsutil cors set cors.json gs://infrio-infotech.appspot.com
    ```
    *Note: You can find your exact bucket URL in the Firebase Console > Storage section.*

### Troubleshooting: Bucket Not Found
If you see a `NotFoundException` or "404 The specified bucket does not exist" error, it means the bucket name is incorrect.

1.  **List your actual buckets** by running this command in Cloud Shell:
    ```bash
    gsutil ls
    ```
2.  You will see output like `gs://some-name.appspot.com/`.
3.  **Copy that name** and use it in the CORS command:
    ```bash
    gsutil cors set cors.json gs://YOUR_ACTUAL_BUCKET_NAME
    ```

### Option 2: Using Local CLI
If you have `gsutil` installed locally:
1.  Open your terminal in this project folder.
2.  Run:
    ```bash
    gsutil cors set cors.json gs://infrio-infotech.appspot.com
    ```
