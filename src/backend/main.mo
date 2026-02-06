import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type ModIdea = {
    id : Nat;
    title : Text;
    description : Text;
    gamePlatform : Text;
    tags : [Text];
    createdAt : Time.Time;
    author : ?Principal;
  };

  let modIdeaList = List.empty<ModIdea>();
  var nextId = 0;

  public shared ({ caller }) func createModIdea(
    title : Text,
    description : Text,
    gamePlatform : Text,
    tags : [Text],
  ) : async Nat {
    let modIdea : ModIdea = {
      id = nextId;
      title;
      description;
      gamePlatform;
      tags;
      createdAt = Time.now();
      author = if (caller.toText() == "anonymous") { null } else { ?caller };
    };
    modIdeaList.add(modIdea);
    nextId += 1;
    modIdea.id;
  };

  public query ({ caller }) func getAllModIdeas() : async [ModIdea] {
    modIdeaList.toArray();
  };

  public query ({ caller }) func getModIdea(id : Nat) : async ModIdea {
    switch (modIdeaList.find(func(idea) { idea.id == id })) {
      case (null) { Runtime.trap("Mod idea not found") };
      case (?idea) { idea };
    };
  };
};
