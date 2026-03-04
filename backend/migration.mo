import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    modIdeas : Map.Map<Nat, ModIdea>;
    nextId : Nat;
    userToModIdeas : Map.Map<Principal, [Nat]>;
  };

  type ModData = {
    name : Text;
    description : Text;
    features : [Text];
    authorName : Text;
    category : Text;
    createdAt : Time.Time;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    mods : List.List<ModData>;
  };

  public func run(old : OldActor) : NewActor {
    {
      userProfiles = old.userProfiles;
      mods = List.empty<ModData>();
    };
  };

  // Deprecated ModIdea type for migration purposes
  type ModIdea = {
    id : Nat;
    title : Text;
    description : Text;
    gamePlatform : Text;
    tags : [Text];
    createdAt : Time.Time;
    isActive : Bool;
    activationTime : Time.Time;
  };
};
