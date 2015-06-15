
;*****
修改云线
;*****

(defun c:cld (/ oldos p1 p2 x1 y1 x2 y2 x y xdiv ydiv xdist ydist b000)
	(setq oldos(getvar "osmode"))
	(setvar "plinegen" 1)	
	(setvar "plinewid" 0.0)
        (setvar "osmode" 0)

  (setq p1 (getpoint "\nInput One Corner Point:"))
  (setq p2 (getcorner p1 "\nInput Other Corner Point:"))

  (if (= dscale nil)
    (setq dscale (getreal "\nDrawing scale:"))
   (progn
    (princ "\nDrawin scale <")
    (princ dscale)
    (princ ">:")
    (setq b000 (getreal))
    (if (/= b000 nil)
        (setq dscale b000)
    )
   )
  )

(setq x1 (car  p1)
        y1 (cadr p1)
        x2 (car  p2)
        y2 (cadr p2)
  )
  (setq p1 (list (min x1 x2) (min y1 y2))
        p2 (list (max x1 x2) (max y1 y2))
  )
  (setq x (abs (- x1 x2))
        y (abs (- y1 y2))
  )

  (setq xdiv (fix (/ x dscale))
        ydiv (fix (/ y dscale))
  )
  (if (< xdiv 2) (setq xdiv 2))
  (if (< ydiv 2) (setq ydiv 2)) 
  (setq xdist (/ x xdiv)
        ydist (/ y ydiv)
  )
  (setq x1 (car  p1)
        y1 (cadr p1)
  )



	(command "pline" p1 "a")

	(repeat xdiv 
		(setq x1 (+ x1 xdist))
		(command "a" "120" (list x1 y1))
	)
	(repeat ydiv 
		(setq y1 (+ y1 ydist))
		(command "a" "120" (list x1 y1))
	)
	(repeat xdiv 
		(setq x1 (- x1 xdist))
		(command "a" "120" (list x1 y1))
	)
	(repeat ydiv 
		(setq y1 (- y1 ydist))
		(command "a" "120" (list x1 y1))
	)
        (command "")

	(setvar "osmode" oldos)
        (princ)
)
;*****
层的改变
;*****
(setvar "cmdecho" 0)


(DEFUN C:Lf (/ a b)
(graphscr)
(prompt "\nPick the entity to be turn off: ")
(setq a (entget (car (entsel))))
(setq b (cdr (assoc 8 a)))
(command "layer" "off" b "")
(setvar "highlight" 1)
)


(defun C:ll (/ p l n e lay0)
 (princ "\nOnly turn on layers be selected.")
 (setq p (ssget))
 (command "layer" "off" "*" "y" "")
 (if p
  (progn
   (setq l 0)
   (setq n (sslength p))
   (while (< l n)
      (setq e (entget (ssname p l)))
      (setq lay0 (cdr (assoc 8 e)))
      (command "layer" "on" lay0 "")
      (setq l (1+ l))
    )
   )
  )
 (terpri)
 (princ)
)


(DEFUN C:LS ()
(graphscr)
(prompt "\nPick the entity to set layer: ")
(setq a (entget (car (entsel))))
(setq b (cdr (assoc 8 a)))
(command "layer" "s" b "")
(setvar "highlight" 1))


(defun c:oa()
  (command "layer" "on" "*" "")
  (princ)
)
