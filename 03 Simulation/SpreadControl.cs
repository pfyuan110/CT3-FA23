//using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpreadControl : MonoBehaviour
{
    public SpawnControl spawnControl;

    private HashSet<GameObject> awakeAI;
    private HashSet<GameObject> AItoCheck;
    private GameObject firstGuy;

    private bool isRun = false;

    //Color
    private Renderer ren;
    public Color[] color;
    private float _color;

    //Camera
    public Camera cam;

    //Cursor
    public Texture2D logo;
    public CursorMode cursorMode = CursorMode.Auto;
    public Vector2 hotSpot = Vector2.zero;

    void Awake()
    {
        awakeAI = new HashSet<GameObject>();
        AItoCheck = new HashSet<GameObject>(); 
    }

    void Start() 
    {
        if (PropertyControl.gridNum >= 25)
        {
            cam.orthographicSize = 12;
        }    
    }
    void Update()
    {
        Cursor.SetCursor(logo, hotSpot, cursorMode);
        
        if (!isRun){
            firstGuy = spawnControl.guys[PropertyControl.gridNum/2, PropertyControl.gridNum/2];
            Debug.Log(firstGuy);
            awakeAI.Add(firstGuy);
            
            _color = Random.Range(0f,1f);
            ren = firstGuy.GetComponentInChildren<MeshRenderer>();

            if(_color <= PropertyControl.typeRate){
                ren.material.color = color[0];
            } else if(_color > PropertyControl.typeRate){
                ren.material.color = color[1];
            }
            
            isRun = true;
        }

        foreach(GameObject guy in awakeAI)
        {
            FaceToMouse facetomouse = guy.GetComponentInChildren<FaceToMouse>();
            facetomouse.isActive = true;
        }
    }

    private void OnEnable()
    {
        StartCoroutine(Simulate());
    }

    private IEnumerator Simulate()
    {
        var interval = new WaitForSeconds(PropertyControl.speed);
        yield return interval;

        while(true)
        {
            UpdateState();
            //Debug.Log("start");
            Debug.Log(firstGuy.transform.GetChild(1));
            yield return interval;
        }
    }

    private void UpdateState()
    {
        AItoCheck.Clear();

            for (int x = 0; x < PropertyControl.gridNum; x++)
            {   
                for (int z = 0; z < PropertyControl.gridNum; z++)
                {
                    if (!awakeAI.Contains(spawnControl.guys[x,z]))
                    {
                        continue;
                    }

                    for (int i = -1; i <= 1; i++)
                    {
                        for (int j = -1; j <= 1; j++)
                        {
                            if (x+i < PropertyControl.gridNum && z+j < PropertyControl.gridNum && x+i >= 0 && z+j >= 0)
                            {
                                AItoCheck.Add(spawnControl.guys[x+i,z+j]);
                            }
                        }
                    }
                }
            }
        
        AItoCheck.ExceptWith(awakeAI);
        awakeAI.UnionWith(AItoCheck);
        
        foreach(GameObject guy in AItoCheck)
        {
            _color = Random.Range(0f,1f);
            ren = guy.GetComponentInChildren<MeshRenderer>();

            if(_color <= PropertyControl.typeRate){
                ren.material.color = color[0];
            } else if(_color > PropertyControl.typeRate){
                ren.material.color = color[1];
            }
        }
    }
}
