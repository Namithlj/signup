function isUppercase(char) {
    return char >= 'A' && char <= 'Z';
}

function isDigit(char) {
    return char >= '0' && char <= '9';
}

function isSpecialCharacter(char) {
    const specialCharacters = "@#";
    return specialCharacters.includes(char);
}

function dfaPasswordValidator(password) {
    let state = "q0";
    let reason = "";

    for (let char of password) {
        if (state === "q0") {
            if (isUppercase(char)) {
                state = "q1";
            } else {
                reason = "Password must start with an uppercase letter.";
                return { isValid: false, state, reason };
            }
        } else if (state === "q1") {
            if (isDigit(char)) {
                state = "q2";
            } else if (!/^[a-zA-Z]$/.test(char)) {
                reason = "After uppercase letter, only letters are allowed.";
                return { isValid: false, state, reason };
            }
        } else if (state === "q2") {
            if (isSpecialCharacter(char)) {
                state = "q3";
            } else if (!/^[a-zA-Z0-9]$/.test(char)) {
                reason = "After a digit, only alphanumeric characters are allowed.";
                return { isValid: false, state, reason };
            }
        }
    }

    if (state !== "q3") {
        reason = "Password must end with a special character.";
        return { isValid: false, state, reason };
    }

    return { isValid: true, state, reason: "" };
}

module.exports = dfaPasswordValidator;
