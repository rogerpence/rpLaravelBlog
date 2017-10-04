### Folder structure

#### Models are in `/app/`

#### Views are in `/resources/views`

Views are referenced with a dot-separated name built out of the folder structure and view name. For example:

	views/layouts/app.blade.php

would be referenced as:

	layouts.app

and 
	views/layout/	

Click <a href=#>here</a> for more info.

#### Controllers are in `/app/Http/Controllers/`

#### Routes are in `/routes/`

* The project's root is in `/public/`

* Migrations and seeds are in `/database/`


### Configuration 

`/.env` contains many configuration variables. These are available anywhere in the Laravel app with:

	 env('KEY', 'default')

where `KEY` is the name of the configuration and `default` is the value used if the key isn't defined. 

There are several `.php` files in the `/config` folder that define many application variables. Each of these files return an array and Laravel's `config` function can fetch these values. [Read more about Laravel configuration here.](https://laravel.com/docs/5.5/configuration)


### Views 



 



Needed

	composer require doctrine/dbal


Undo the most recent migration:

	php artisan migrate:rollback --step=1



1. Create a model.

	php artisan make:model Post

1. Create a model and a migration
	
		php artisan make:model [ModelName] -m	
	
	Note the model name is to be singular and capitalized.		 
	
2. Create a migration.

		php artisan make:migration create_posts_table
	
	Define table columns in the resulting `/database/migrations/n` file.		

3. Run any pending migrations.

		php artisan migrate
		
		
 sudo vim /etc/phpmyadmin/config.inc.php
		
