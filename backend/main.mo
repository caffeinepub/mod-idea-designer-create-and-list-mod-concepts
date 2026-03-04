import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Migration "migration";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
actor {
  // Initialize authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile data
  type UserProfile = {
    name : Text;
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Mod data type
  type ModData = {
    name : Text;
    description : Text;
    features : [Text];
    authorName : Text;
    category : Text;
    createdAt : Time.Time;
  };

  type PublicModData = {
    name : Text;
    description : Text;
    features : [Text];
    authorName : Text;
    category : Text;
    createdAt : Time.Time;
  };

  let mods = List.empty<ModData>();

  /// Save a new mod (no authentication required).
  /// All mods are stored and accessible publicly.
  public shared ({ caller }) func saveMod(
    name : Text,
    description : Text,
    features : [Text],
    authorName : Text,
    category : Text,
  ) : async () {
    let newMod : ModData = {
      name;
      description;
      features;
      authorName;
      category;
      createdAt = Time.now();
    };

    mods.add(newMod);
  };

  // Fetch all mods
  public query ({ caller }) func getAllMods() : async [PublicModData] {
    let modArray = mods.toArray();
    modArray.map(func(mod) { mod });
  };
};
