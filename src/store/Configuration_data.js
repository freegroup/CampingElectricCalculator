const configuration = {
  center: { type: "accu", uuid: "1" },
  left: [
    {
      type: "fuse",
      uuid: "7",
      children: [
        {
          type: "solarBooster",
          uuid: "4",
          children: []
        }
      ]
    },
    { 
      type: "starterBooster", 
      uuid: "6", 
      children: [] 
    }
  ],
  right: [{ type: "fuse", uuid: "8", children: [] }]
}

export default configuration
