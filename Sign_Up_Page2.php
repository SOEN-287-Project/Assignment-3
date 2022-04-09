  
<!DOCTYPE html>
<html>

<head>
    <title>Sign Up Page</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #467CFA;">
        <div class="container-fluid">
            <img src="Images/blue basket.png" alt="">
            <h1><span>E</span>-Mart</h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav ml-auto mr-5">
                    <li class="mr-2">
                        <a class="nav-link" href="CartText.html"><img src="Images/small cart.png" alt="cant find small cart.png"></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="Index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Login_Page.html">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Sign_Up_Page.html">Sign Up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Aisles
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" style="font-size: small;" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><a class="dropdown-item" href="Fruits&Vegetables.html">Fruits & Vegetables</a></li>
                            <li><a class="dropdown-item" href="Dairy&Eggs.html">Dairy & Eggs</a></li>
                            <li><a class="dropdown-item" href="Meat&Poultry.html">Meat & Poultry</a></li>
                        </ul>

                    </li>
                    <li class="nav-item dropdown">

                        <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Back End
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" style="font-size: small;" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><a class="dropdown-item" href="p7.html">Product List</a></li>
                            <li><a class="dropdown-item" href="p9.html">User List</a></li>
                        </ul>
                </ul>
            </div>
        </div>
    </nav>





    <div class="page-wrapper" style="margin-left: 3vw;">
        <h1 style="margin: 2vh 0vh;">Sign Up Page</h1>
        <form action="">
            <label for="gender">Select your gender:</label>
            <select name="gender" id="gender">
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
      </select>
            <br><br>
            <label>First Name: </label>
            <input type="text" name="firstname" id="firstname" required />
            <label id="validate4" style="color: red;visibility:hidden">Invalid</label>
            <br> <br>
            <label>Last Name: </label>
            <input type="text" name="lastname" id=lastname required/>
            <label id="validate5" style="color: red;visibility:hidden">Invalid</label>
            <br> <br>
            <label>Postal Code: </label>
            <input type="text" name="postalcode" id="postalCode" required/>
            <label id="validate3" style="color: red;visibility:hidden">Invalid</label>
            <br><br>
            <label>Email Address: </label>
            <input type="text" name="email" id="email"required />
            <label id="validate" style="color: red;visibility:hidden">Invalid</label>
            <br><br>
            <label>Password: </label>
            <input type="password" name="password" id="password" required/>
            <br><br>
        </form>
        <button onclick="validateEmail();validatePostalCode();validateFirstName();validateLastName();" type="button">Create Account</button>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js " integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi " crossorigin="anonymous "></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js " integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG " crossorigin="anonymous "></script>
    <script src=login_validation.js></script>
  </body>

</html>