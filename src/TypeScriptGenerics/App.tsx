// 1. Basic Generic Function
// Without generic
function withoutGeneric(item: any): any {
    return item;
}

// With generic
function withGeneric<T>(item: T): T {
    return item;
}

// Usage
const numberResult = withGeneric<number>(42);        // type: number
const stringResult = withGeneric<string>("hello");   // type: string
const autoInferred = withGeneric("auto");           // TypeScript infers string

// 2. Generic Array Functions
function getFirstItem<T>(array: T[]): T | undefined {
    return array[0];
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const firstNumber = getFirstItem(numbers);  // type: number

const strings = ["a", "b", "c"];
const firstString = getFirstItem(strings);  // type: string

// 3. Generic Interfaces
interface Box<T> {
    value: T;
    setValue: (newValue: T) => void;
}

// Usage
const numberBox: Box<number> = {
    value: 42,
    setValue: (newValue: number) => {
        numberBox.value = newValue;
    }
};

const stringBox: Box<string> = {
    value: "hello",
    setValue: (newValue: string) => {
        stringBox.value = newValue;
    }
};

// 4. Multiple Generic Types
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Usage
const numberStringPair = pair(42, "hello");     // type: [number, string]
const booleanNumberPair = pair(true, 123);      // type: [boolean, number]

// 5. Generic Constraints
interface HasLength {
    length: number;
}

function printLength<T extends HasLength>(item: T): number {
    return item.length;
}

// Usage
printLength("hello");              // Works: string has length
printLength([1, 2, 3]);           // Works: array has length
printLength({ length: 10 });      // Works: object has length property
// printLength(123);              // Error: number doesn't have length

// 6. Generic Classes
class Queue<T> {
    private data: T[] = [];

    push(item: T): void {
        this.data.push(item);
    }

    pop(): T | undefined {
        return this.data.shift();
    }
}

// Usage
const numberQueue = new Queue<number>();
numberQueue.push(123);  // OK
// numberQueue.push("123");  // Error: can't push string

const stringQueue = new Queue<string>();
stringQueue.push("hello");  // OK
// stringQueue.push(123);    // Error: can't push number

// 7. Real World Example: API Response Handler
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
}

// Generic API function
async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
    const response = await fetch(url);
    return response.json();
}

// Usage
async function example() {
    // User API call
    const userResponse = await fetchApi<User>('/api/user');
    console.log(userResponse.data.name);  // TypeScript knows it's string

    // Product API call
    const productResponse = await fetchApi<Product>('/api/product');
    console.log(productResponse.data.price);  // TypeScript knows it's number
}

// 8. Practical Use Cases
// Generic State Management
type State<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};

function createInitialState<T>(): State<T> {
    return {
        data: null,
        loading: false,
        error: null
    };
}

// Usage
const userState = createInitialState<User>();
const productState = createInitialState<Product>();

// 9. Default Generic Types
interface Container<T = string> {
    value: T;
}

const stringContainer: Container = { value: "hello" };  // T defaults to string
const numberContainer: Container<number> = { value: 42 };  // Explicitly set T to number