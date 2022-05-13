import Mcp from "./mcp";

const abi = require("./abi.json");

const McpFunc = new Mcp();

McpFunc.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress = "0x2358a85ED61084E8cDBc566C1560ed4AAd04d3A3";
const coreAddress = "0x2358a85ED61084E8cDBc566C1560ed4AAd04d3A3";

const Instance = new McpFunc.Contract(
    abi,
    tokenAddress
);

const Contract = {
    tokenAddress,
    Instance,
    coreAddress
};

export default Contract;
