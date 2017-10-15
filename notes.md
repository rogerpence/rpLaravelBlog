Launch VirtualBox VM with a .desktop file




It's a hassle to need to go into VirtualBox's UI to launch a VM. This article shows how to change a VirtualBox VM's settings and then launch it by clicking a shortcut on the Ubuntu desktop. Although there are utilities available to create .desktop files, this articles shows that you don't need 'em. All you need is a text editor. 




<img align="left" class="img-thumbnail" style="margin-right: 20px;margin-bottom: 10px;" src="http://www.rogerpence.com/wp-content/uploads/2017/09/Screenshot-from-2017-09-30-10-52-31.png">I'm using a VirutalBox VM on a PHP project The VM is a desktop version of Ubuntu 17.04, sometimes used with one monitor and sometimes used with two. VB works great in this environment but its multiple monitor capabilities are a little prickly. Launching the VM with one monitor when the settings are set for two monitors is sometimes troublesome. The problem is easy to fix: just change the VM settings to one or two monitors. But it's annoying to have to remember to do that. What I wanted was a couple of buttons on the desktop to launch the VM for either one or two monitors. 

The solution required creating a little bash script, a couple of `.desktop` files, and downloading a couple of pngs. (One of the only times I miss Windows is when I need Illustrator!). There are utilities available to create desktop shortcuts, but they aren't worth the time and grief. Creating a `.desktop` file manually is a very simple.

#### The runvm.sh bash script

This bash script first uses VirtualBox's VBoxManage command line to change the VM's monitor setting to either one or two monitors and then it launches the VM. 
```
    # Pass either 1 or 2 for number of monitors to use.
    VBoxManage modifyvm "Laravel 5.5" --monitorcount $1
    VBoxManage startvm "Laravel 5.5"
```

This file can be in many places, I keep mine in the home root. Be sure to make it executable with: 

    chgmod u+x runvm.sh

#### The .desktop file

Unity app launchers are config files in the ~/Desktop folder. The entries for a `.desktop` file are pretty much self-explanatory. Note the paths specified must be fully-qualified (don't use the `~/` home shortcut). Put these files in the `~/Desktop` folder. The name of the file doesn't matter; the `Name` entry in the `.desktop` file provides its desktop text. [The full docs for .desktop files]((https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles)) are very helpful. In my case, two `.desktop` files were needed, one for a vm with one monitor and one for two monitors. (The `.desktop` file for one monitor is shown below.)

```
    [Desktop Entry]
    Version=1.0
    Type=Application
    Terminal=false
    Exec=/home/roger/runvm.sh 1
    Name=VM w/1
    Comment=comment here
    Icon=/home/roger/Pictures/one.png
    Categories=Utility
```

Each `.desktop` file must also be made executable with: 

    chgmod u+x run1vm.desktop

After saving a `.desktop` file it shows immediately on your desktop.