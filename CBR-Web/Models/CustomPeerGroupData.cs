namespace CBR.Web.Models
{
    using System;

    [Serializable]
    public class CustomPeerGroupData
    {
        public string Name { get; set; }
        public int NumberOfPeers { get; set; }
        public DateTime Created { get; set; }
        public int Key { get; set; }
        public bool IsDefault { get; set; }
    }
}
