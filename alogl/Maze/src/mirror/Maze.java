package mirror;

public class Maze {
	private static int N=8;
	private static int[][] maze = {
			{0, 0, 0, 0, 0, 0, 0, 1},
			{0, 1, 1, 0, 1, 1, 0, 1},
			{0, 0, 0, 1, 0, 0, 0, 1},
			{0, 1, 0, 0, 1, 1, 0, 0},
			{0, 1, 1, 1, 0, 0, 1, 1},
			{0, 1, 0, 0, 0, 1, 0 ,1},
			{0, 0, 0, 1, 0, 0, 0, 1},
			{0, 1, 1, 1, 0, 1, 0, 0}
	};
	
	private static int PATHWAY_COLURE = 0; // white ( visited이며 아직 출구로 가는 경로가 될 가능성이 있는 cell)
	private static int WALL_COLURE = 1; //  blue
	private static int BLOCKED_COLOUR = 2; // red ( visited이며 출구까지의 경로상에 있지 않음이 밝혀진 cell ) 
	private static int PATH_COLOUR =3; // green
	
	
	
	public static boolean findMazePath(int x, int y) {
		if(x<0 || y<0 || x>=N || y>=N)  
			return false;
		else if ( maze[x][y] != PATHWAY_COLURE)
			return false;
		else if(x==N-1 && y==N-1) {
			maze[x][y] = PATH_COLOUR;
			return true;
		} else {
			maze[x][y] = PATH_COLOUR;
			if(findMazePath(x-1, y) || findMazePath(x, y+1) || findMazePath(x+1, y) || findMazePath(x, y-1)) {
				return true;
			}
			maze[x][y] = BLOCKED_COLOUR;
			return false;
		}
		
	}

	private static void printMaze() {
		
		int length = maze.length;
		for( int i = 0 ; i < length  ; i++ ) {
			for( int j = 0 ; j < maze[i].length ; j++ ) {
				System.out.print(maze[i][j]);	
			}
			System.out.println();			
		}
		System.out.println();		
	}

	public static void main(String[] args) {
		printMaze();
		findMazePath(0, 0);
		
		printMaze();
		
	}

}



/*
	Recursive Thinking
	미로찾기(Decision Problem)
	
	boolean findPath(x ,y)
		if (x,y) is either on the wall or a visited cell
			return false;
		else if(x,y) is the exit
			return true;
		else
			mark (x,y) as a visited cell;
			for each neighbouring cell(x',y') of (x,y) do 
				if (x',y') is on the pathway
					if findPath(x', y')
						return true;
			return false;
	

*/