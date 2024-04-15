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
    const parentese: string[] = [];

    const processOperator = (operator: string) => {
        while (
            operators.length > 0 &&
            precedence(operator) <= precedence(operators[operators.length - 1])
        ) {
            createNode(operators, values);
        }
        operators.push(operator);
    };

    for (let i = 0; i < tokens.length; i++) {
        switch (true) {
            case isPremises(tokens[i]):
                values.push(new TreeNode(tokens[i]));
                break;
            case tokens[i] === '(':
                parentese.push(tokens[i]);
                break;
            case tokens[i] === ')':
                while (operators.length > 0 && parentese[parentese.length - 1] !== '(') {
                    createNode(operators, values);
                }
                parentese.pop(); // Remover o parêntese de abertura correspondente
                operators.pop(); // Remover o operador '(' da pilha de operadores
                break;
            case isOperator(tokens[i] + tokens[i + 1]):
                processOperator(tokens[i] + tokens[i + 1]);
                i++; // Pula o próximo token porque já foi processado
                break;
            case isOperator(tokens[i]):
                processOperator(tokens[i]);
                break;
        }
    }

    while (operators.length > 0) {
        createNode(operators, values);
    }
    return values.pop()!;
};

const generateCombinations = (premissas: string[]): Set<object> => {
    const combinations: any = new Set();
    const numberOfCombinations = Math.pow(2, premissas.length);
    for (let i = 0; i < numberOfCombinations; i++) {
        const combination: { [key: string]: boolean } = {};
        for (let j = 0; j < premissas.length; j++) {
            combination[premissas[j]] = !!(i & (1 << j));
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


const traverse = (node: any, level = 1, result: any = []) => {
    if (node === null) {
        return;
    }

    if (node.left !== null && node.right !== null) {
        if (result[level] === undefined) {
            result[level] = [];
        }
        result[level].push(`${node.left.value} ${node.value} ${node.right.value}`);
    }

    traverse(node.left, level + 1, result);
    traverse(node.right, level + 1, result);
    return result;
}

export const generateTruthTable = (expression: string): object[] => {
    const premissas = Array.from(new Set(expression.replace(/[^P-S]/g, "")));
    const combinations: any = generateCombinations(premissas);
    const tree = buildTree(expression.split(''));
    const truthTable = [];
    for (let combination of combinations) {
        const result = evaluateOperation(tree, combination);
        truthTable.push({
            ...combination,
            Result: result
        });
    }
    return truthTable;
};
