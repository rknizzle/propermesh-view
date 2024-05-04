export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("PlyBlobDatabase", 1);
    request.onupgradeneeded = function () {
      const db = request.result;
      if (!db.objectStoreNames.contains("FilesStore")) {
        db.createObjectStore("FilesStore", { keyPath: "id" });
      }
    };
    request.onerror = function (event) {
      console.error("Database error:", event.target.errorCode);
      reject("Database error: " + event.target.errorCode);
    };
    request.onsuccess = function () {
      resolve(request.result);
    };
  });
};

export const storeBlob = async (partId, units, thresholdValue, blob) => {
  const db = await openDatabase();
  const transaction = db.transaction("FilesStore", "readwrite");
  const store = transaction.objectStore("FilesStore");
  const key = `${partId}-${units}-${thresholdValue}`;

  const request = store.put({ id: key, blob: blob });
  return new Promise((resolve, reject) => {
    request.onerror = function () {
      console.error("Error storing blob:", request.error);
      reject("Failed to store blob");
    };
    request.onsuccess = function () {
      resolve(request.result);
    };
    transaction.oncomplete = function () {
      db.close();
    };
    transaction.onerror = function (event) {
      console.error("Transaction failed:", event);
      reject("Transaction failed:", event);
    };
  });
};

export const retrieveBlob = async (partId, units, thresholdValue) => {
  const db = await openDatabase();
  const transaction = db.transaction("FilesStore", "readonly");
  const store = transaction.objectStore("FilesStore");
  const key = `${partId}-${units}-${thresholdValue}`;
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      console.error("Error retrieving blob:", event.target.error);
      reject("Could not retrieve the file: " + event.target.errorCode);
    };
    request.onsuccess = function () {
      if (request.result) {
        resolve(request.result.blob);
      } else {
        resolve(null);
      }
    };
    transaction.oncomplete = function () {
      db.close();
    };
    transaction.onerror = function (event) {
      console.error("Transaction failed:", event);
      reject("Transaction failed:", event);
    };
  });
};
