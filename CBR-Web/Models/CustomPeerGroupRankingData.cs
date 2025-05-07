using System;
using System.Collections.Generic;

namespace CBR.Web.Models
{
    [Serializable]
    public class CustomPeerGroupRankingData
    {
        private List<PeerGroupRankData> _peerGroupRankDataQtr;
        private List<PeerGroupAverageData> _peerGroupAverageDataQtr;
        private List<PeerGroupRankData> _peerGroupRankDataYtd;
        private List<PeerGroupAverageData> _peerGroupAverageDataYtd;

        public CustomPeerGroupRankingData()
        {
            this._peerGroupAverageDataQtr = new List<PeerGroupAverageData>();
            this._peerGroupRankDataQtr = new List<PeerGroupRankData>();
            this._peerGroupAverageDataYtd = new List<PeerGroupAverageData>();
            this._peerGroupRankDataYtd = new List<PeerGroupRankData>();
        }

        public List<PeerGroupRankData> PeerGroupRankDataQtr
        {
            get
            {
                return this._peerGroupRankDataQtr;
            }

            set
            {
                this._peerGroupRankDataQtr = value;
            }
        }

        public List<PeerGroupAverageData> PeerGroupAverageDataQtr
        {
            get
            {
                return this._peerGroupAverageDataQtr;
            }

            set
            {
                this._peerGroupAverageDataQtr = value;
            }
        }

        public List<PeerGroupRankData> PeerGroupRankDataYtd
        {
            get
            {
                return this._peerGroupRankDataYtd;
            }

            set
            {
                this._peerGroupRankDataYtd = value;
            }
        }

        public List<PeerGroupAverageData> PeerGroupAverageDataYtd
        {
            get
            {
                return this._peerGroupAverageDataYtd;
            }

            set
            {
                this._peerGroupAverageDataYtd = value;
            }
        }
    }
}
