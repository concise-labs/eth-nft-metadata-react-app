import { useState } from "react";
import "./App.css";
import { CopyBlock, dracula } from "react-code-blocks";

const API_KEY = '' //get your own api key from app.conciselabs.io
function App() {
  const [contractAddress, setContractAddress] = useState("");
  const [nftId, setNftId] = useState("");
  const [result, setResult] = useState("");
  const [chain, setChain] = useState("ethereum-mainnet");
const [image, setImage] = useState("")
  const fetchNFt = async () => {
    let res = await fetch(
      `https://app.conciselabs.io/api/v0/nfts/${chain}/${contractAddress}/${nftId}/metadata/${API_KEY}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setResult(err);
      });
    setResult(res);
    if(res.metadata.image) {
      let url = res.metadata.image;
      if (url.startsWith("ipfs")) {
        url = `https://ipfs.io/ipfs/${url.replace("ipfs://", "")}`;
      }
      setImage(url) 
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl">Fetch NFT metadata</h1>

        <div className="pl-7 ">
          <div className="pt-[10px] flex pr-[34px] flex-col">
            <input
              type="text"
              placeholder="Enter Contract Address"
              onChange={(e) => {
                setContractAddress(e.target.value);
              }}
              value={contractAddress}
              className="bg-bg-[#323131] border border-[#B0B0B0] w-[505px] text-sm rounded-sm p-2.5 dark:bg-[#323131] dark"
            />
<br />
            <input
              type="text"
              placeholder="Enter NFT ID"
              onChange={(e) => {
                setNftId(e.target.value);
                // console.log(e)
              }}
              value={nftId}
              className="bg-bg-[#323131] border border-[#B0B0B0] w-[505px] text-sm rounded-sm p-2.5 dark:bg-[#323131] dark"
            />

            <select
              id=""
              value={chain}
              label="Chain"
              onChange={(e) => {
                setChain(e.target.value);
              }}
              className="bg-bg-[#323131] border border-[#B0B0B0] w-[505px] text-sm rounded-sm p-2.5 dark:bg-[#323131] dark mt-[25px]"
            
            >
              <option value="ethereum-mainnet">Ethereum Mainnet</option>
              <option value="polygon-mainnet">Polygon Mainnet</option>
              <option value="bsc-mainnet">BSC Mainnet</option>
              <option value="avalanche-mainnet">Avalanche Mainnet</option>
            </select>

            <button
              onClick={fetchNFt}
              className="bg-gradient-to-r from-[#F55151] to-[#FFB800] text-base w-[161px] h-[46px] py-2 px-4 rounded mt-[20px] mb-[20px]"
            >
              Submit
            </button>
          </div>
        </div>
        {result && (
      <div className="flex h-full ml-[15px] mb-[10px] text-left">
          <CopyBlock
            text={
              result.metadata
                ? JSON.stringify(result.metadata, null, 1)
                : JSON.stringify(result)
            }
            language={"json"}
            showLineNumbers={true}
            theme={dracula}
            codeBlock
          />
          <img src={image} alt="abc" className="h-[500px] ml-[200px] -translate-y-1/3" />
      </div>
        )}
    </div>
  );
}

export default App;
