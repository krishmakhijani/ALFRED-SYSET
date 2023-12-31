#!/usr/bin/osascript
--------------------------------------------------------------------------
# Created by ChristoferK to generate a machine device icon and modified by
# Vítor Galvão to support Apple Silicon.
--------------------------------------------------------------------------

use scripting additions
use framework "AppKit"

property this : a reference to the current application
property nil : a reference to missing value
property NSBitmapImageRep : a reference to NSBitmapImageRep of this
property NSWorkspace : a reference to NSWorkspace of this

on run argv
  set filepath to POSIX file (item 1 of argv)

  tell (TIFFRepresentation of iconForFileType_("'root'") ¬
          in the sharedWorkspace of NSWorkspace) to tell ¬
          representationUsingType_properties_(4, nil) of ¬
          (NSBitmapImageRep's imageRepWithData:it) to if ¬
          writeToURL_atomically_(filepath, yes) then ¬
          return # Return nothing, to not mess JSON
end run
