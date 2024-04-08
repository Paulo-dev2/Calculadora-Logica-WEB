class TreeNode {
    value: string;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(value: string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export const operators = new Set(["^", "V", "~", "->", "<>"]);

export const isOperator = (token: string): boolean => operators.has(token);

export const premises = new Set(["P", "Q", "R", "S"]);

export const isPremises = (token: string): boolean => premises.has(token)

const precedenceMap = new Map([
    ["~", 3], // Negation
    ["^", 2], // Conjunction (AND)
    ["V", 1], // Disjunction (OR)
    ["→", 0], // Conditional
    ["↔", 0] // Biconditional
]);

const precedence = (op: string): number => precedenceMap.get(op) || 0;

const createNode = (operators: string[], values: TreeNode[]): void => {
    const node = new TreeNode(operators.pop() as string);
    node.right = values.pop() as TreeNode;
    if (node.value !== '~') { // Operador de negação só tem um operando
        node.left = values.pop() as TreeNode;
    }
    values.push(node);
};

export const buildTree = (tokens: string[]): TreeNode => {
    const values: TreeNode[] = [];
    const operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
        if (isPremises(tokens[i])) {
            values.push(new TreeNode(tokens[i]));
        } else if (tokens[i] === '(') {
            operators.push(tokens[i]);
        } else if (tokens[i] === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                createNode(operators, values);
            }
            operators.pop(); // Remove o '('
        } else if (isOperator(tokens[i] + tokens[i + 1])) {
            while (
                operators.length > 0 &&
                precedence(tokens[i] + tokens[i + 1]) <= precedence(operators[operators.length - 1])
            ) {
                createNode(operators, values);
            }
            operators.push(tokens[i] + tokens[i + 1]);
            i++; // Pula o próximo token porque já foi processado
        } else if (isOperator(tokens[i])) {
            while (
                operators.length > 0 &&
                precedence(tokens[i]) <= precedence(operators[operators.length - 1])
            ) {
                createNode(operators, values);
            }
            operators.push(tokens[i]);
        }
    }

    while (operators.length > 0) {
        createNode(operators, values);
    }
    return values.pop()!;
};


const generateCombinations = (variables: string[]): Set<object> => {
    const combinations: any = new Set();
    const numberOfCombinations = Math.pow(2, variables.length);
    for (let i = 0; i < numberOfCombinations; i++) {
        const combination: { [key: string]: boolean } = {};
        for (let j = 0; j < variables.length; j++) {
            combination[variables[j]] = !!(i & (1 << j));
        }
        combinations.add(combination);
    }
    return combinations;
};

const evaluateOperation = (node: TreeNode | null, values: { [key: string]: boolean }): boolean => {
    if (!node) {
        return false;
    }
    if (isPremises(node.value)) {
        return values[node.value];
    }
    const leftValue = evaluateOperation(node.left, values);
    const rightValue = node.right ? evaluateOperation(node.right, values) : false;
    switch (node.value) {
        case "^":
            return leftValue && rightValue;
        case "V":
            return leftValue || rightValue;
        case "->":
            return !(leftValue && !rightValue)
        case "~":
            return !rightValue;
        case "<>":
            return leftValue === rightValue;
        default:
            throw new Error(`Operador desconhecido: ${node.value}`);
    }
};

export const generateTruthTable = (expression: string): object[] => {
    const variables = Array.from(new Set(expression.replace(/[^P-S]/g, "")));
    const combinations: any = generateCombinations(variables);
    const tree = buildTree(expression.split(''));
    const truthTable = [];
    for (let combination of combinations) {
        console.log(tree)
        const result = evaluateOperation(tree, combination);
        truthTable.push({
            ...combination,
            Result: result
        });
    }
    return truthTable;
};
