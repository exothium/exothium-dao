import "./App.css"
import {
    type ConnectOptions,
    type DisconnectOptions,
} from "exothium-dao";
import {useState} from "react";
import {starknetConnect, starknetDisconnect, ownerOfExothian} from "exothium-dao"

function App() {
    const [walletName, setWalletName] = useState<string>("")
    const [nftNumber, setNftNumber] = useState<number>(1);
    const [ownerOf, setOwnerOf] = useState<string>("")

    function handleConnect(options?: ConnectOptions) {
        return async () => {
            const res: any = await starknetConnect(options);
            setWalletName(res?.name || "")
        }
    }

    function handleDisconnect(options?: DisconnectOptions) {
        return async () => {
            await starknetDisconnect(options)
            setWalletName("")
        }
    }

    function getOwnerOf() {
        ownerOfExothian(nftNumber).then((owner: string) => {
            setOwnerOf(owner);
        }).catch((e: any) => {
            setOwnerOf("(Most likely the token number is not associated with an address) " + e.message);
        });
    }

    // @ts-ignore
    return (
        <div className="App">
            <h1>Get-Starknet (choose wallet to connect)</h1>
            <div className="card">
                <button className='button' onClick={handleConnect()}>Connect</button>
                <button className='button' onClick={handleDisconnect({clearLastWallet: true})}>
                    Disconnect and reset
                </button>
            </div>
            <h1>Exothium-Dao examples</h1>
            {walletName ?
                <div>
                    <div>
                        <div>
                            <span>Owner Of Exothian number</span>
                            <input type={"number"} value={nftNumber} className={'input'}
                                   onChange={(event) => setNftNumber(Number(event.target.value))}/>
                            <button className='button' onClick={() => getOwnerOf()}>Get</button>
                            : <b>{ownerOf}</b>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <span>Connect to a wallet to see examples</span>
                </div>
            }
        </div>
    )
}

export default App
