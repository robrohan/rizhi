# 日志 (rì zhì - journal)

Hello and welcome to our show!

日志 (pronounced similar to _Rural Juror_ from _30 Rock_) is a simple blogging platform that only requires javascript in the browser and static HTML hosting (and, of course, the viewer to be using a modern browser).

The markdown engine is [showdown][] if you are curious.

## Why?

Why?  Well, for some problems applications like _Wordpress_ are overkill.  For _Wordpress_ and it's kin, you need to have PHP setup, a database setup, you need to update the code and plugins all the time, etc etc.   If you are just putting up a simple or temporary site, that process can be a drag.

I've grown fond of projects like [jekyll][].  They let you write static markdown files using any text editor you like, and then generate a static blog from your markdown files.  The only problem with Jekyll and the like is you have to install and run the code to generate the blogs -- ruby in the case of [jekyll][].

What if you want to just have a simple blog, write posts using your iPad (or other tablet), and host the content directly on Dropbox?   The iPad has a lot of nice text editors, but you can't install ruby.

How about if you're really lazy, and just want a mildly dynamic [project page on Github](https://pages.github.com)?  Or what if [Creed asks you to setup a blog for him](https://www.youtube.com/watch?v=E9VA8ph5f8o).

The only thing you need to use 日志 is a place put HTML files, and a way to upload markdown files.

## Installation

Upload all the files to a hosting location - Dropbox, S3, an traditional hosting provider, etc.

Once uploaded browse to the _index.html_ file.  For example: `http://example.com/herp/index.html`.

To change a page, or to view a post, you add the location 'after the hash'.  So, for example, to view the default post you'd view `http://example.com/herp/index.html#posts/2014/da-jia-hao` and to view a page you'd browse to `http://example.com/herp/index.html#pages/about`.  The `index.html#<directories>/<file>` is how you create internal links.

## Writing a New Post

To create a new post, you simply create a new file in the _posts_ directory and give it an _md_ extension.  Then, using markdown syntax, write an amazing post.

At the top of the file you can add meta data.  For example, to change the _title_ of the page, add the header:

    title: my title here

to the very top of the markdown file.

Since there is no server side code running, there isn't a reliable way to create a list of your current posts.  After you write a new post, put it in the _posts_ directory, and are ready to publish, you need to update the _pages/index.md_ file to point to the new file.  

For example, if you added a post titled 'my-new-post.md' in the _posts/2014_ directory you would add the following line to the _pages/index.md_ file:

    * [First Post](#posts/2014/da-jia-hao)
	* [Next Post](#posts/2014/my-new-post)

The link will then show up on your index page.

## Problems

* I just felt like writing this one Saturday, it's kind of stream of consciousness coding.  I wouldn't use this for anything incredibly important.
* The client has to have Javascript turned on or the site wont work at all (just the index page will load)
* Each page load makes several requests back to the server (to load other markdown files)

## Quick Tour

There are three places you may want to add and / or update markdown files.  In the _posts_ directory you put anything you consider a post, and _pages_ is where you put anything you consider a page.  (This layout is only a suggestion as you can load markdown files from whatever directory you like).

    .
    ├── assets                   <= 'system' files
    │   └── js
    │       ├── rizhi.js
    │       └── showdown-0.3.1
    ├── index.html
    ├── pages                    <= your pages go here
    │   ├── about.md
    │   └── index.md
    ├── posts                    <= posts go here
    │   └── 2014                 <= organized however you want
    │       └── da-jia-hao.md
    └── themes                   <= if you want to change the L&F
        └── default
            ├── footer.md
            ├── header.md
            └── style.css


[jekyll]: http://jekyllrb.com
[showdown]: https://github.com/coreyti/showdown