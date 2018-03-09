import { Party, PartyType, CreateTransactionRequest, WalletRegistrationRequest, WalletUnRegistrationRequest} from './models';
import { SmartContractService } from './smartcontract.service';
import { AgentService } from './agent.service';
import { Contract, utils, Wallet, Provider, providers } from "ethers";

export class IndOracle {
	provider: Provider;
	oracleWallet: Wallet;
	nodeUrl: string;
	networkChainId: number;
	//networkName = "something";
	agentService: AgentService;
	smartContractService: SmartContractService;

	constructor(nodeUrl: string, networkChainId: number, oraclePrivateKey: string) {
		console.log("In oracle constructor");
		console.log("nodeUrl", nodeUrl);
		console.log("networkChainId", networkChainId);
		console.log("oraclePrivateKey", oraclePrivateKey);
		this.nodeUrl = nodeUrl;
		this.networkChainId = networkChainId;
		this.provider = this.forceFieldProvider();
		console.log("provider", this.provider);
		this.oracleWallet = new Wallet(oraclePrivateKey, this.provider);
		console.log("oracleWallet", this.oracleWallet);
		this.agentService = new AgentService();
		console.log("agentService created");
		this.smartContractService = new SmartContractService(this.provider, this.oracleWallet, this.agentService);
		console.log("In oracle constructor: completed");
	}
	
	forceFieldProvider(): Provider {
		var provider = new providers.JsonRpcProvider(this.nodeUrl,
		  {
			chainId: this.networkChainId//,
			//name: this.networkName
		  });
		return provider;
	}

    async registerWalletAgent(request: WalletRegistrationRequest) {
		return this.agentService.registerWalletAgent(request);
	}

	async unRegisterWalletAgent(request: WalletUnRegistrationRequest) {
		return this.agentService.unRegisterWalletAgent(request);
	}

	async createTransaction(request: CreateTransactionRequest) {//marketplaceAddress: string, factoryAddress: string, myParty: Party, parties: Array<Party>, signature: string) {
		//inputs: mktplace address, factory address, [list of user info in json format], signature
		
		return this.smartContractService.createTransaction(request);
		//returns {contractId, error, list of transaction hashes, status};
	}
	async updateParty(marketplaceAddress: string, factoryAddress: string, contractId: number, parties: Array<Party>, signature: string) {
		//inputs: mktplace address, factory address, contractId, [list of user info in json format], signature


		//returns {error, transaction hash, status};
	}
	async verifyIdentity(marketplaceAddress: string, factoryAddress: string, contractId: number, partyOTA: string, role: PartyType, signature: string) {
		//inputs: mktplace address, factory address, contractId, onetime key, role of that OTA, signature


		//return party;
	}
}