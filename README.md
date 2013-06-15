This is a in progress experiment in connecting a Parallax Propeller MCU via a serial link through a node.js server to web pages.

The aim is to demonstrate creating an interactive GUI for a Propeller application. 


Install
-------

Checkout the code and install some required node modules:

    $ git clone https://github.com/ZiCog/propeller-node
    $ cd propeller-node
    $ npm install express
    $ npm install socket.io
    $ npm install serialport

Run
---

Edit the code and adjust server port (default is 8080) and serial port device 
(default is /dev/ttyS0)

Just run it (May need root privs or fix the permissions on your serial port first)

    $ sudo node propeller-node.js
    
You should see the following on the console:

    info  - socket.io started
    Server running at undefined:8080/
    Serial open.

If that is correct you should now be able to access it's web page on http:/localhost:8080
(Or from a another machine use the appropriate IP address).

The front page (index.html) does nothing much yet. If you look at the HTML you will see there is some
websocket stuff comming.

Hit the link "View the raw serial input buffer" at the bottom of that page and you should see the 
latest data update comming into the serial port. Refresh that page to see more updates.
















 
