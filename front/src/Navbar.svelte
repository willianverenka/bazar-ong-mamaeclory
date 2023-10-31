<div class="nav">
    <input type="checkbox" id="nav-check">
    <div class="nav-header">
      <div class="nav-title">
        <a href="/">Mamãe Clory</a>
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    
    <div class="nav-links">
      <a href="https://mamaeclory.org.br/" target="_blank">Nosso site</a>
    </div>
  </div>

<style>
      *{
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
    padding: 0;
  }
.nav {
  height: 50px;
  width: 100%;
  background-color: transparent;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #a92121;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: rgb(159, 14, 14);
}

.nav > .nav-links > a:hover {
  background-color: rgba(212, 41, 41, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #b44242;
  }
  .nav > .nav-links {
    text-align: center;
    position: absolute;
    display: block;
    width: 100%;
    background-color: #ffffff;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
 .nav{
    z-index: 999;
 }
 a{
  text-decoration: none;
 }
}
</style>