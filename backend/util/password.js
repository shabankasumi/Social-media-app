import bycrypt from "bcrypt";
const saltRounds = 10;
export const hashPassword = async (password) => {
    const salt = await bycrypt.genSalt(saltRounds);
    const hashedPassword = await bycrypt.hash(password, salt);
    return hashedPassword;
};
export const comparePassword = async (password, hashedPassword) => {
    return await bycrypt.compare(password, hashedPassword);
};