import React from 'react';
const Header = () => {
    return (
        <div>
  <nav class="navbar navbar-expand-lg navbar-light ">
  <a class="navbar-brand" href="/">Online Book House</a>
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link ms-5 deactive" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ms-5 deactive" aria-current="page" href="/addproduct">Add Product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ms-5 deactive" aria-current="page" href="/Login">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    );
};

export default Header;