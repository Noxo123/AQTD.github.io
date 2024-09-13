/* Reset CSS to ensure consistent styling across browsers */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Set a basic font and background for the entire page */
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f9;
    color: #333;
    line-height: 1.6;
    padding: 0;
    margin: 0;
}

/* Centralize the auth container and make it responsive */
#auth-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

#auth-container h1 {
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #444;
}

/* Input styles */
input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

input:focus {
    border-color: #007BFF;
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
}

/* Button styles */
button {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Primary button style */
#login-btn {
    background-color: #007BFF;
    color: white;
}

#login-btn:hover {
    background-color: #0056b3;
}

/* Secondary button style */
#signup-btn {
    background-color: #6c757d;
    color: white;
}

#signup-btn:hover {
    background-color: #5a6268;
}

/* Toggle button for dark mode */
#toggle-theme-btn {
    background-color: #f8f9fa;
    color: #333;
    border: 1px solid #ddd;
}

#toggle-theme-btn:hover {
    background-color: #e2e6ea;
}

/* Dark mode styles */
.dark-theme {
    background-color: #2c2c2c;
    color: #fff;
}

.dark-theme #auth-container {
    background-color: #3c3c3c;
    border-color: #555;
    color: #ddd;
}

.dark-theme input {
    background-color: #555;
    border-color: #666;
    color: #ddd;
}

.dark-theme input:focus {
    border-color: #17a2b8;
    box-shadow: 0px 0px 5px rgba(23, 162, 184, 0.5);
}

.dark-theme button {
    background-color: #444;
    color: #ddd;
}

.dark-theme #login-btn {
    background-color: #17a2b8;
    color: white;
}

.dark-theme #login-btn:hover {
    background-color: #138496;
}

.dark-theme #signup-btn {
    background-color: #6c757d;
}

.dark-theme #signup-btn:hover {
    background-color: #5a6268;
}

.dark-theme #toggle-theme-btn {
    background-color: #444;
    color: #ddd;
    border-color: #666;
}

/* Media query for mobile responsiveness */
@media (max-width: 600px) {
    #auth-container {
        margin: 50px 20px;
        padding: 20px;
    }

    input, button {
        font-size: 0.9rem;
        padding: 10px;
    }
}
