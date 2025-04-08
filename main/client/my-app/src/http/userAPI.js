import profile from "../pages/Profile";

const SERVER_ADDR = "http://localhost:5000";


export class ErrorResponse {
    constructor (error, message) {
        this.error = error;
        this.message = message;
    }
}

export class SuccessResponse {}

export class RegisterResponse extends SuccessResponse {
    constructor (redirect) {
        super();
        this.redirect = redirect;
    }
}
export class LoginResponse extends RegisterResponse {} // the same

export class SessionCheckResponse extends SuccessResponse {
    constructor (success) {
        super();
        this.success = success;
    }
}

export class ProfileResponse extends SuccessResponse {
    constructor (name, email, age, phone) {
        super();
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone = phone;
    }
}


// Врапперы для Fetch API
// для GET запросов
async function get(addr, data) {
    try {
        return (await fetch(`${addr}?${new URLSearchParams(data)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })).json();
    } catch (e) {
        return Promise.reject(e);
    }
}

// и для POST запросов
async function post(addr, data) {
    try {
        return (await fetch(addr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })).json();
    } catch (e) {
        return Promise.reject(e);
    }
}


export async function registration(name, surname, age, phone, email, password) {
    const result = await post(`${SERVER_ADDR}/api/auth/register`, {
        "username": `${name} ${surname}`,
        age,
        phone,
        email,
        password,
        role: 'USER',
        hobbies: null,
        details: null
    });

    if (result["error"]) {
        return new ErrorResponse(result["error"], result["message"]);
    }

    return new RegisterResponse(result["redirect_url"]);
}

export async function login(email, password) {
    const result = await post(`${SERVER_ADDR}/api/auth/login`, {
        email,
        password,
    });
    
    if (result["error"]) {
        return new ErrorResponse(result["error"], result["message"]);
    }

    return new LoginResponse(result["redirect_url"]);
}

export async function check() {
    const result = await get(`${SERVER_ADDR}/api/auth/check`, {});

    if (result["error"]) {
        return new SessionCheckResponse(false);
    }

    return new SessionCheckResponse(true);
}

export async function getProfile() {
    const result = await get(`${SERVER_ADDR}/api/user/my_profile`, {});

    if (Object.keys(result).length <= 0) {
        return new ErrorResponse("not_authorized", "Не авторизован");
    };
    return new ProfileResponse(result["name"], result["email"], result["age"], result["phone"]);
}

export async function getOtherProfile(id) {
    const result = await get(`${SERVER_ADDR}/api/user/my_profile`, {
        "user_id": id,
    });
    return new ProfileResponse(result["name"], result["email"], result["age"], result["phone"]);
}

export async function logout() {
    await post(`${SERVER_ADDR}/api/auth/logout`);
    return null;
}


export async function HandleSubmit(name, surname, phone, email, age, hobbies, detailes) {
    const response = await getProfile();
    const gmail = response.email
    console.log(name, surname, phone, email, age, hobbies, detailes)
    await get(`${SERVER_ADDR}/api/user/update`, {name, email: gmail, age, phone});
    return null;
}

