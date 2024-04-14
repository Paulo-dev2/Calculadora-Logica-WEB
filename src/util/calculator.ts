import { generateTruthTable, isOperator, isPremises, operators } from "./tree";

const cleanExpression = (expression: string): string => expression.replace(/\s/g, "");

const extractPremises = (expression: string): string[] => Array.from(new Set(expression.match(/[P-S]/g) || []));

//const tokenize = (expression: string): string[] => expression.replace(/->|<>/g, ' $& ').split(/\s+/);

const isValidSequence = (expression: string): boolean => {
    const lastChar = expression[expression.length - 1];
    if (operators.has(lastChar)) {
        return false;
    }
    for (let i = 0; i < expression.length - 1; i++) {
        if (isPremises(expression[i]) && isPremises(expression[i + 1])) return false;
        if (isOperator(expression[i]) && isOperator(expression[i + 1]) && !(expression[i + 1] == "~")) return false;
        if (isOperator(expression[i]) && expression[i + 1] === ")") return false;
        if (isOperator(expression[i]) && i === 0 && expression[i] !== "~") return false;
    }
    return true;
};

const calculate = (expression: string): { truthTable: object[], tableHeader: string[] } | false | undefined => {
    if (expression.length === 0) return false;
    const cleanedExpression = cleanExpression(expression);
    const {
        openParentheses,
        closeParentheses
    } = countParentheses(cleanedExpression);
    if (openParentheses !== closeParentheses) return false;

    if (!isValidSequence(cleanedExpression)) return false;

    const premises = extractPremises(expression);
    const tableHeader = [...premises, cleanedExpression];
    const truthTable = generateTruthTable(cleanedExpression);
    return {
        truthTable,
        tableHeader
    };
};

const countParentheses = (expression: string): { openParentheses: number, closeParentheses: number } => {
    const openParentheses = (expression.match(/\(/g) || []).length;
    const closeParentheses = (expression.match(/\)/g) || []).length;
    return {
        openParentheses,
        closeParentheses
    };
};

export default calculate;
