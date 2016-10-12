# Dynamit WordPress Theme Base

## Running Locally
You should have some sort of environment locally that you can use to download and install a version of WordPress. If all else fails, use MAMP.

## Developing the Theme
Once you have a local install, clone this repo into the `wp-content/themes` directory. After cloning, in the command line navigate to this theme directory.

`npm install`

That will install all of `node_modules`

Locally in the command line set `export DYNAMIT_WP_INSTALL='localhost/yourpath'` so browsersync will be open to your installation of WordPress.

After everything is installed, say the magic word `gulp` and everything should fire up.

Gulp should watch and reload any time a JS/CSS/PHP file is updated. x

## Look To John Hartley for Questions

## jQuery is already in
WordPress comes with it by default, but we can remove it and write Vanilla JS via ES6.

## Adding Custom Fields to the admin
We generally use ACF Pro. Whenever you create a new set of custom fields we will need to export them. With ACF Pro installed, and go to `Custom Fields` then `Tools` and then select one field group and click "Generate export code". Copy/paste into a file inside `inc/custom-fields`. This will help keep the custom fields in version control and will prevent us from needing to transfer databases all the time.

Note: You'll need to require the custom fields in the functions.php file.
