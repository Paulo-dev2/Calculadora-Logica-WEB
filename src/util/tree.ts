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

export const isPremises = (token: string): boolean => premises.has(token);

const precedenceMap = new Map([
    ["~", 3], // Negation
    ["^", 2], // Conjunction (AND)
    ["V", 1], // Disjunction (OR)
    ["->", 0], // Conditional
    ["<>", 0] // Biconditional
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

const createHeader = (expression: string): string[] => {
    const tokens = expression.split('');
    const subexpressions: string[] = [];
    const stack: string[] = [];
    let current: string = '';

    for (let i = 0; i < tokens.length; i++) {
        switch(tokens[i]) {
            case '(':
                if (current.length > 0) {
                    stack.push(current);
                    current = '';
                }
                stack.push(tokens[i]);
                break;
            case ')':
                if (current.length > 0) {
                    subexpressions.push(current);
                    current = '';
                }
                let expr: string = '';
                while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    expr = stack.pop() + expr;
                }
                stack.pop(); // Remove '('
                if (expr.length > 0) {
                    current = expr;
                    subexpressions.push(current);
                    current = '';
                }
                break;
            default:
                if (isOperator(tokens[i] + tokens[i + 1])) {
                    current += tokens[i] + tokens[i + 1];
                    i++;
                } else if (isOperator(tokens[i])) {
                    current += tokens[i];
                } else {
                    current += tokens[i];
                }
        }
    }
    if (current.length > 0) {
        subexpressions.push(current);
    }
    if (!subexpressions.includes(expression)) {
        subexpressions.push(expression);
    }
    return subexpressions;
};


export const generateTruthTable = (expression: string): any => {
    const premissas = Array.from(new Set(expression.replace(/[^P-S]/g, "")));
    const combinations: any = generateCombinations(premissas);
    const header = createHeader(expression);
    const tree = buildTree(expression.split(''));
    const truthTable = [];

    for (let combination of combinations) {
        const row: { [key: string]: boolean } = { ...combination };
        for (let subExpr of header) {
            const subTree = buildTree(subExpr.split(''));
            row[subExpr] = evaluateOperation(subTree, combination);
        }
        truthTable.push(row);
    }
    return [truthTable, header];
};
