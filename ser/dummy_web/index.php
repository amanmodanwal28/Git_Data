<!-- index.php -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Simple PHP Website</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
    <h1>Welcome to My Simple PHP Website</h1>
    <nav>
      <ul>
        <li><a href="index.php">Home</a></li>
        <li><a href="contact.php">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h2>Home Page</h2>
    <p>This is a simple home page created using PHP, CSS, and a little JavaScript.</p>
  </main>

  <?php include 'footer.php'; ?>
</body>

</html>