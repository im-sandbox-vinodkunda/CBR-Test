using System;
using System.Linq;
using System.IO;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using CBR.Common;

namespace CBR.Web.App_Storage
{
    public static class AzureStorage
    {
        private static CloudBlobContainer _container = null;

        static AzureStorage()
        {
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
               CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            _container = blobClient.GetContainerReference(CloudConfigurationManager.GetSetting("AzureStorageContainer"));
        }

        public static CloudBlobContainer CreateAzureStorageContainer(string containerName)
        {
            CloudBlobContainer container = null;

            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
               CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            
            try
            {
                containerName = containerName.ToLower();
                // Create a blob container.
                container = blobClient.GetContainerReference(containerName);
                if(!container.Exists())
                {
                    container.Create();
                }
                
                //Console.WriteLine("Container Created Successfully..");
            }
            catch (Exception ex)
            {
                
            }

            return container;
        }

        public static bool UploadFileToAzureStorage(string fileName, string fileFullPath)
        {
            bool result = false;

            //memStream.Seek(0, SeekOrigin.Begin);
            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = _container.GetBlockBlobReference(fileName);

            if (fileName.EndsWith(".pdf", StringComparison.InvariantCultureIgnoreCase) == true)
            {
                blockBlob.Properties.ContentType = "application/pdf";
            }

            // Create or overwrite the "myblob" blob with contents from a local file.
            using (var fileStream = System.IO.File.OpenRead(fileFullPath))
            {
                blockBlob.UploadFromStream(fileStream);
            }

            result = true;

            return result;
        }

        public static bool UploadFileToAzureStorage(string fileName, System.IO.Stream memStream, string containerName)
        {
            bool result = false;

            CloudBlobContainer container = CreateAzureStorageContainer(containerName);

            memStream.Seek(0, SeekOrigin.Begin);
            // Retrieve reference to a blob named "myblob".
            //CloudBlockBlob blockBlob = _container.GetBlockBlobReference(fileName);

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            if (fileName.EndsWith(".pdf", StringComparison.InvariantCultureIgnoreCase) == true)
            {
                blockBlob.Properties.ContentType = "application/pdf";
            }

            blockBlob.UploadFromStream(memStream, null, new BlobRequestOptions { MaximumExecutionTime = TimeSpan.FromMinutes(10) });

            result = true;

            return result;
        }

        public static byte[] DownloadFileFromAzureStorage(string fileName, string containerName, out string contentType, out string contentLength)
        {
            
            CloudBlobContainer container = CreateAzureStorageContainer(containerName);

            // Retrieve reference to a blob named "myblob".
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            MemoryStream memStream = new MemoryStream();

            blockBlob.DownloadToStream(memStream);

            contentType = blockBlob.Properties.ContentType;
            contentLength = blockBlob.Properties.Length.ToString();

            return memStream.ToArray();

            //blockBlob.UploadFromStream(memStream, null, new BlobRequestOptions { MaximumExecutionTime = TimeSpan.FromMinutes(10) });
        }

        public static bool DeleteFileFromAzureStorage(string fileName, string containerName)
        {
            bool retVal = false;
            try
            {
                CloudBlobContainer container = CreateAzureStorageContainer(containerName);

                // Retrieve reference to a blob named "myblob".
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);
                blockBlob.Delete();
                retVal = true;
            }
            catch (Exception ex)
            {
                ExceptionHelper.TrackException(ex);
            }

            return retVal;
        }
    }
}
